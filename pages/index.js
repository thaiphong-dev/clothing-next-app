import Footer from "./../components/common/footer/footer";
import "../styles/Home.module.css";
import Header from "./../components/common/header/header"
export default function Home() {
  return (
    <div style={{height: "100vh"}}>
      <Header />
      <div style={{height: "1vh"}}></div> 
      <Footer />
    </div>
  );
}
