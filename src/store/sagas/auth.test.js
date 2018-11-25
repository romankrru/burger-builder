/* eslint-disable */
import {logoutSaga} from './auth';
import { call, put } from 'redux-saga/effects';
import { logoutSucceed, authLogout, authStart, checkAuthTimeout, authSuccess, authFail } from '../actions';

describe('`logoutSaga` test', () => {
	const gen = logoutSaga();

	it('logoutSaga should remove `expirationDate` from ls', () => {
		expect(gen.next().value).toEqual(call([localStorage, 'removeItem'], 'expirationDate'))
	});

	it('logoutSaga should remove `idToken` from ls', () => {
		expect(gen.next().value).toEqual(call([localStorage, 'removeItem'], 'idToken'))
	});

	it('logoutSaga should remove `localId` from ls', () => {
		expect(gen.next().value).toEqual(call([localStorage, 'removeItem'], 'localId'))
	});

	it('logoutSaga must dispatch `logoutSucceed` action', () => {
		expect(gen.next().value).toEqual(put(logoutSucceed()))
	});
});
