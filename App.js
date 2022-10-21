import React, { Component, Suspense } from 'react';
import './App.css';
import { Routes, Route, useParams, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/login/Login';
import { connect, Provider } from 'react-redux';
import Preloader from './components/common/preloader/preloader';
import { initializeApp } from './Redux/app-reducer'
import { compose } from 'redux';
import store from './Redux/redux-store';
import { BrowserRouter } from 'react-router-dom';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

export function withRouter(Children) {
  return (props => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />
  })
};

class App extends Component {

  catchAllUnhandleErrors = (promiseRejectionEvent) => {
    alert('some error occured')
  }

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhandleErrors)
  };

  componentWillUnmount(){
    window.removeEventListener('unhandledrejection', this.catchAllUnhandleErrors)
  };

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Suspense fallback={<div><Preloader /></div>}>
          <Routes>
            <Route path="/" element={<Navigate to={'/profile'} />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path="/profile/" element={<ProfileContainer />}>
            <Route path=":userId" element={<ProfileContainer />} />
            </Route>
            <Route path='/dialogs/*' element={<DialogsContainer />} />
            <Route path='/news' element={<News />} />
            <Route path='/music' element={<Music />} />
            <Route path='/users' element={<UsersContainer />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='*' element={<div>404 NOT FOUND</div>} />
          </Routes>
        </Suspense>
      </div>
    </div >
    );
  }
};

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

let AppContainer = compose(withRouter, connect(mapStateToProps, { initializeApp }))(App);

const SamuraiAPP = (props) => {
  return (
        <BrowserRouter>
          <Provider store={store}>
            <AppContainer />
          </Provider>
        </BrowserRouter>
        )
};

export default SamuraiAPP;