import { Navigation } from "./NavigationBar";

export const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  );
};
