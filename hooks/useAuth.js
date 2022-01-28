import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import * as Google from 'expo-google-app-auth';
import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithCredential,
	signOut,
} from '@firebase/auth';
import { auth } from '../firebase';
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '@env';

const AuthContext = createContext({});

const config = {
	androidClientId: ANDROID_CLIENT_ID,
	iosClientId: IOS_CLIENT_ID,
	scopes: ['profile', 'email'],
	permissions: ['public_profile', 'email'],
};

export const AuthProvider = ({ children }) => {
	const [error, setError] = useState(null);
	const [user, setUser] = useState(null);
	const [loadingInitial, setLoadingInitial] = useState(true);
	const [loading, setLoading] = useState(false);

	useEffect(
		() =>
			onAuthStateChanged(auth, (user) => {
				if (user) {
					setUser(user);
				} else {
					setUser(null);
				}

				setLoadingInitial(false);
			}),
		[]
	);

	const logout = () => {
		setLoading(true);

		signOut(auth)
			.catch((error) => setError(error))
			.finally(() => setLoading(false));
	};

	const signInWithGoogle = async () => {
		setLoading(true);
		await Google.logInAsync(config)
			.then(async (logInResult) => {
				if (logInResult.type === 'success') {
					// login
					const { idToken, accessToken } = logInResult;
					const credential = GoogleAuthProvider.credential(
						idToken,
						accessToken
					);

					await signInWithCredential(auth, credential);
				}

				return Promise.reject();
			})
			.catch((error) => setError(error))
			.finally(() => setLoading(true));
	};

	const memoedValue = useMemo(
		() => ({
			user,
			loading,
			error,
			logout,
			signInWithGoogle,
		}),
		[user, loading, error]
	);

	return (
		<AuthContext.Provider value={memoedValue}>
			{!loadingInitial && children}
		</AuthContext.Provider>
	);
};

export default function useAuth() {
	return useContext(AuthContext);
}
