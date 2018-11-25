/* eslint-disable */
import {delay} from 'redux-saga';
import {logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga} from './auth';
import { call, put } from 'redux-saga/effects';
import { logoutSucceed, authLogout, authStart, checkAuthTimeout, authSuccess, authFail } from '../actions';

describe('`logoutSaga` test', () => {
	const gen = logoutSaga();

	it('should remove `expirationDate` from ls', () => {
		expect(gen.next().value).toEqual(call([localStorage, 'removeItem'], 'expirationDate'))
	});

	it('should remove `idToken` from ls', () => {
		expect(gen.next().value).toEqual(call([localStorage, 'removeItem'], 'idToken'))
	});

	it('should remove `localId` from ls', () => {
		expect(gen.next().value).toEqual(call([localStorage, 'removeItem'], 'localId'))
	});

	it('must dispatch `logoutSucceed` action', () => {
		expect(gen.next().value).toEqual(put(logoutSucceed()))
	});

	it('must be done', () => {
		expect(gen.next()).toEqual({ done: true, value: undefined })
	});
});

describe('`checkAuthTimeoutSaga` test', () => {
	const gen = checkAuthTimeoutSaga({expirationTime: 3600});

	it('should setup delay', () => {
		expect(gen.next().value).toEqual(call(delay, 3600 * 1000));
	});

	it('should dispatch `authLogout` action', () => {
		expect(gen.next().value).toEqual(put(authLogout()))
	});

	it('must be done', () => {
		expect(gen.next()).toEqual({ done: true, value: undefined })
	});
});

describe('`authUserSaga` test', () => {
	const userData = {email: 'test@test.com', password: 'mypwd'};
	const gen = authUserSaga(userData);

	const response = {
			data: {
			expiresIn: '1000',
			idToken: '__my__idToken__',
			localId: '__my__localId__',
		},
	};

	it('must dispatch `authStart`', () => {
		expect(gen.next().value).toEqual(put(authStart()));
	});

	it('should make API request', () => {
		const output = gen.next().value.CALL.args[1];

		const expected = {
			...userData,
			returnSecureToken: true,
		};

		expect(output).toEqual(expected);
	});

	it('should calculate correct `expirationDate`', () => {
		// Temporary mock Date.now fn
		const realDateNow = global.Date.now;
		global.Date.now = () => 1543152357134;
		const result = gen.next(response).value;
		expect(result).toEqual(new Date('2018-11-25T13:42:37.134Z'));
		// Turn Date.now back
		global.Date.now = realDateNow;
	});

	it('should add `expirationDate` to ls', () => {
		const result = gen.next(new Date('2018-11-25T13:42:37.134Z')).value;
		const expected = call([localStorage, 'setItem'], 'expirationDate', new Date('2018-11-25T13:42:37.134Z'));
		expect(result).toEqual(expected);
	});

	it('should add `idToken` to ls', () => {
		const result = gen.next().value;
		const expected = call([localStorage, 'setItem'], 'idToken', response.data.idToken);
		expect(result).toEqual(expected);
	});

	it('should add `localId` to ls', () => {
		const result = gen.next().value;
		const expected = call([localStorage, 'setItem'], 'localId', response.data.localId);
		expect(result).toEqual(expected);
	});

	it('should dispatch `checkAuthTimeout` action', () => {
		expect(gen.next().value).toEqual(put(checkAuthTimeout(response.data.expiresIn)));
	});

	it('should dispatch `authSuccess` action', () => {
		expect(gen.next().value).toEqual(put(authSuccess(response.data)));
	});

	it('must be done', () => {
		expect(gen.next()).toEqual({ done: true, value: undefined })
	});
});

