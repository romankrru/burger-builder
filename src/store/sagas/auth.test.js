/* eslint-disable */
import {delay} from 'redux-saga';
import {logoutSaga, checkAuthTimeoutSaga} from './auth';
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

	it('should dispatch `logoutSucceed` action', () => {
		expect(gen.next().value).toEqual(put(authLogout()))
	});

	it('must be done', () => {
		expect(gen.next()).toEqual({ done: true, value: undefined })
	});
});
