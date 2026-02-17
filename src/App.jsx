import router from "./router/router";
import { RouterProvider } from "react-router-dom";

function App() {
  return <RouterProvider router={router} />;
  /*const [contacts, setContacts] = useState({});

      useEffect(() => {
          fetch('/data/data.json')
          .then(res => res.json())
          .then(data => setContacts(data));
      }, []);
  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Header contacts={contacts} />
        <HeroSection />
        <ServicesSection />
        <Home />
        <Footer contacts={contacts} />
    </>
  );*/
}

export default App;