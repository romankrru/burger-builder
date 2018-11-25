/* eslint-disable */
import {delay} from 'redux-saga';
import { cloneableGenerator } from 'redux-saga/utils';
import { call, put } from 'redux-saga/effects';

import {logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga} from './auth';
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

describe('`authCheckStateSaga` test', () => {
	const gen = cloneableGenerator(authCheckStateSaga)();

	it('should get `idToken` from ls', () => {
		const result = gen.next().value;
		const expected = call([localStorage, 'getItem'], 'idToken');
		expect(result).toEqual(expected);
	});

	describe('has no idToken', () => {
		let clone;

		beforeAll(() => {
			clone = gen.clone();
		});

		it('should dispatch `authLogout`', () => {
			const result = clone.next(undefined).value;
			const expected = put(authLogout());
			expect(result).toEqual(expected);
		});

		it('must be done', () => {
			expect(clone.next()).toEqual({ done: true, value: undefined })
		});
	});

	describe('has idToken', () => {
		let clone;

		beforeAll(() => {
			clone = gen.clone();
		});

		it('should get `expirationDateLs` from ls', () => {
			const result = clone.next('mytoken').value;
			const expected = call([localStorage, 'getItem'], 'expirationDate');
			expect(result).toEqual(expected);
		});

		it('should calculate `expirationDate`', () => {
			const d = +(new Date(Date.now() + 1000))
			const result = clone.next(d).value;
			expect(result).toEqual(new Date(d));
		});

		it('should get `localId` from ls', () => {
			const result = clone.next(Date.now + 1000).value;
			const expected = call([localStorage, 'getItem'], 'localId');
			expect(result).toEqual(expected);
		});

		it('should dispatch `authSuccess` action', () => {
			expect(clone.next('mylocalid').value).toEqual(put(authSuccess({
				localId: 'mylocalid',
				idToken: 'mytoken'
			})));
		});
	});
});
