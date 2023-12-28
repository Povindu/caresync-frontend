import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import DoctorLogin from "./src/screens/DoctorLoginScreen";
import ContactUs from "./src/screens/ContactUs";
import DoctorRegister from "./src/screens/DoctorRegister";
import PatientRegister from "./src/screens/PatientRegister";
import PatientLogin from "./src/screens/PatientLogin";


const navigator = createStackNavigator(
  {
    
    Home: HomeScreen,
    DoctorLogin: DoctorLogin,
    ContactUs: ContactUs,
    DoctorRegister: DoctorRegister,
    PatientRegister: PatientRegister,
    PatientLogin: PatientLogin,
    
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "CareSync",
    },
  }
);

export default createAppContainer(navigator);
