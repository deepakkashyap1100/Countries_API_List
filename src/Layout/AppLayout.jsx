
import React, { useState } from 'react'
import { Outlet, useNavigation } from 'react-router-dom'
import Header from './Header'
import Loading from './Loading';
import { ThemeContext } from '../ContextAPI';

const AppLayout = () => {
  const loadingNavigation = useNavigation();
  if (loadingNavigation.state === 'loading') {
    return (<Loading />)
  }
  const [IsDark, setIsDark] = useState(JSON.parse(localStorage.getItem('isDarkMode')));

  return (
    <>
      <ThemeContext.Provider value={[IsDark, setIsDark]}>
        <Header />
        <Outlet />
      </ThemeContext.Provider>
    </>
  )
}

export default AppLayout