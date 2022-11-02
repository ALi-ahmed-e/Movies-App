import { doc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase";
import { AuthAction } from "../Store/slices/AuthSlice";

export default function useRefreshUser() {
    const user = useSelector(state => state.Auth.User)
    const dispatch = useDispatch()
    const { SignIn } = AuthAction
    const refreshUser = async () => {


        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            localStorage.setItem('user', JSON.stringify(docSnap.data()))
            const action = SignIn({ user: docSnap.data() })
            dispatch(action)
        }
    }
    return [refreshUser]
}