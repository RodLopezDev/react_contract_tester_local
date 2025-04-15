import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import PageLayout from "./PageLayout";
import HomePage from "../pages/HomaPage";
import DetailPage from "../pages/DetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PageLayout>
              <HomePage />
            </PageLayout>
          }
        />
        <Route
          path="/contract/:id"
          element={
            <PageLayout>
              <DetailPage />
            </PageLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
