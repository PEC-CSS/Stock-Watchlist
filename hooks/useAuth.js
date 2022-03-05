import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithCredential,
	signOut,
} from 'firebase/auth';
import { auth } from '../firebase';
import {
	ANDROID_STANDALONE_APP_CLIENT_ID,
	IOS_STANDALONE_APP_CLIENT_ID,
	EXPO_CLIENT_ID,
} from '@env';

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext({});

// const config = {
// 	androidClientId: ANDROID_CLIENT_ID,
// 	iosClientId: IOS_CLIENT_ID,
// 	// androidStandaloneAppClientId: ANDROID_STANDALONE_APP_CLIENT_ID,
// 	androidStandaloneAppClientId:
// 		'316148951749-lj3gsji24t5tb07eqjen9ov3jrpvgcjp.apps.googleusercontent.com',
// 	iosStandaloneAppClientId: IOS_STANDALONE_APP_CLIENT_ID,
// 	// iosStandaloneAppClientId: '316148951749-f92vbdc04mughtfsb8feimdr950aedc1.apps.googleusercontent.com',
// 	scopes: ['profile', 'email'],
// 	permissions: ['public_profile', 'email'],
// };

export const AuthProvider = ({ children }) => {
	const [error, setError] = useState(null);
	const [user, setUser] = useState(null);
	const [loadingInitial, setLoadingInitial] = useState(true);
	const [loading, setLoading] = useState(false);

	const [request, response, promptAsync] = Google.useAuthRequest({
		androidClientId: ANDROID_STANDALONE_APP_CLIENT_ID,
		iosClientId: IOS_STANDALONE_APP_CLIENT_ID,
		expoClientId: EXPO_CLIENT_ID,
	});

	useEffect(
		() =>
			onAuthStateChanged(auth, (user) => {
				if (user) {
					setUser(user);
				} else {
					setUser(null);
				}
				setLoadingInitial(false);
				if (loading) setLoading(false);
			}),
		[]
	);

	const logout = () => {
		setLoading(true);

		signOut(auth)
			.catch((error) => setError(error))
			.finally(() => setLoading(false));
	};

	// const signInWithGoogle = async () => {
	// 	setLoading(true);
	// 	console.log('About to call logInAsync');
	// 	try {
	// 		await Google.logInAsync(config)
	// 			.then(async (logInResult) => {
	// 				console.log(`Got logInResult: ${logInResult.type}`);
	// 				if (logInResult.type === 'success') {
	// 					// login
	// 					const { idToken, accessToken } = logInResult;
	// 					const credential = GoogleAuthProvider.credential(
	// 						idToken,
	// 						accessToken
	// 					);
	// 					await signInWithCredential(auth, credential);
	// 				}
	// 				return Promise.reject();
	// 			})
	// 			.catch((error) => setError(error))
	// 			.finally(() => setLoading(false));
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	const getUserData = async (idToken, accessToken) => {
		const credential = GoogleAuthProvider.credential(idToken, accessToken);
		await signInWithCredential(auth, credential);
	};

	useEffect(() => {
		console.log('response');
		if (response?.type === 'success') {
			setLoading(true);
			console.log(response);
			const { idToken, accessToken } = response.authentication;
			getUserData(idToken, accessToken);
		}
	}, [response]);

	const memoedValue = useMemo(
		() => ({
			user,
			loading,
			error,
			logout,
			// signInWithGoogle,
			request,
			promptAsync,
		}),
		[user, loading, error, request]
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
