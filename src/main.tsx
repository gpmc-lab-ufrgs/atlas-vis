import App from './App';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import styles from "./index.css";

import './lib/i18n';

//Screens
// import {
//   AuditLogs,
//   AuthLayout,
//   BackofficeLayout,
//   Clubs,
//   ClubsList,
//   Courses,
//   CoursesList,
//   TeesList,
//   InsertCode,
//   Login,
//   NotFound,
//   UpdatePassword,
//   UserCreate,
//   UserEdit,
//   Users,
//   UsersList,
//   DataEvents,
//   MainDashboard,
//   ChallengesList,
//   CreateEditChallenge,
//   GlobalParamsList,
// } from 'routes';
// import { ParticipantsChallenge } from 'routes/Challenges/Participants';
// import { ForgetPassword } from 'routes/ForgetPassword';
// import { CoursesReported } from 'routes/Reports/Courses';
// import { UsersReported } from 'routes/Reports/Users';
// import { CreateEditGlobalParams } from 'routes/GlobalParams/CreateEdit';

//Styles
import GlobalStyle from './styles/GlobalStyles';
import { MainLayout } from './routes';

//Constants
// import { paths } from './utils/constants';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />} path="/">
      <Route element={<MainLayout />} path='/'>
      
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <GlobalStyle />
    <RouterProvider router={router} />
  </>
);
