import Head from "./global/head";
const Layout = props => (
  <html id="bg">
    <Head />
    <div id="layout">{props.children}</div>
    <style jsx>{`
      #bg {
        background-image: url("http://sf.co.ua/13/02/wallpaper-984442.jpg");
      }
    `}</style>
  </html>
);

export default Layout;
