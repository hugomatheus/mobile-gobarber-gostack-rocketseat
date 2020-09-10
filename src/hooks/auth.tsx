import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}
interface AuthContextData {
  user: object;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AuthState>({} as AuthState);
  // Diferente da web não é possivel realizar a logica dentro do state pois o useState não suporte async e o AsyncStorage, como o nome já diz, utiliza async
  // Como resolver :

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      // Alternativa
      // const user = await AsyncStorage.getItem('@GoBarber:user');
      // const token = AsyncStorage.getItem('@GoBarber:token');

      const [user, token] = await AsyncStorage.multiGet([
        '@GoBarber:user',
        '@GoBarber:token',
      ]);
      if (user[1] && token[1]) {
        setData({ user: JSON.parse(user[1]), token: token[1] });
      }
    }
    setLoading(false);
    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });
    const { user, token } = response.data;

    // Alternativa
    // await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));
    // await AsyncStorage.setItem('@GoBarber:token', token);

    await AsyncStorage.multiSet([
      ['@GoBarber:user', JSON.stringify(user)],
      ['@GoBarber:token', token],
    ]);

    setData({ user, token });
  }, []);

  const signOut = useCallback(async () => {
    // Alternativa
    // await AsyncStorage.removeItem('@GoBarber:user');
    // await AsyncStorage.removeItem('@GoBarber:token');
    await AsyncStorage.multiRemove(['@GoBarber:user', '@GoBarber:token']);
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
