import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userID, setUserID] = useState(null)
    const [isAdmin, setAdmin] = useState(null)

    const login = useCallback( (jwtToken, id, isAdmin) => {
        setToken(jwtToken)
        setUserID(id)
        setAdmin(isAdmin)

        localStorage.setItem(storageName, JSON.stringify( {
            userID: id, token: jwtToken, admin: isAdmin
        }))
    }, [])

    const logout = useCallback( () => {
        setToken(null)
        setUserID(null)
        setAdmin(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect( () => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userID, data.admin)
        }
    }, [login])

    return {token, userID, login, logout, isAdmin}
}