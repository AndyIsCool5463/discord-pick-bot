import Layout from "../components/indexlayout.jsx";

const Index = () => (
  <Layout>
    <div>
      <h1>Pick Bot</h1>
    </div>
    <div class="img">
      <img
        id="logoImg"
        width="500px"
        height="500px"
        src="https://images-ext-2.discordapp.net/external/jiY3uiiq8K2v1cjzFZ3uXQK-sr0ppTtpCvQQ_CAoU58/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/525901565018767364/7dc87eeab21c95936e6f3d799c8c5e5b.png"
      />
    </div>
    <div>
      <p id="small-about">
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the
        undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
        of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
        Cicero, written in 45 BC. This book is a treatise on the theory of
        ethics, very popular during the Renaissance. The first line of Lorem
        Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
        1.10.32.
      </p>
    </div>
    {CSS()}
  </Layout>
);

export default Index;

function CSS() {
  return (
    <style>{`
    @import url("https://fonts.googleapis.com/css?family=Montserrat");
    h1 {
      text-align: center;
      color: white;
      font-size: 72px;
      font-family: Montserrat;
    }
    #small-about {
      color: white;
      padding: 20px;
      text-align: center;
      font-family: Montserrat;
    }
    #logoImg {
      margin-left: 33%;
      transition: all 1500ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    #logoImg:hover {
      margin-left: 33%;
      transform: rotate(360deg);
    }
    `}</style>
  );
}
