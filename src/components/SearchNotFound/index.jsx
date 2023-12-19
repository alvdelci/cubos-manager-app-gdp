import SearchNotFoundPerson from "../../assets/SearchNotFoundPerson.svg";
import Search from "../../assets/search.svg";

const SearchNotFound = () => {
  return (
    <div
      className="search-container"
      style={{
        paddingLeft: "23px",
        paddingRight: "23px",
        paddingTop: "12px",
        paddingBottom: "12px",
        background: "white",
        borderRadius: "30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="Frame"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={SearchNotFoundPerson}
            className="Vector"
            style={{
              position: "absolute",
              marginBottom: "12%",
              marginLeft: "20%",
              width: 128,
              height: 128,
            }}
          />
          <img
            src={Search}
            className="Frame"
            style={{
              display: "flex",
              width: 554,
              height: 430,
            }}
          />
        </div>
        <div
          className="Frame7880"
          style={{
            width: 764,
            height: 79,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
            display: "inline-flex",
          }}
        >
          <span
            className="NenhumResultadoFoiEncontrado"
            style={{
              textAlign: "center",
              color: "#F08889",
              fontSize: 28,
              fontFamily: "Montserrat",
              fontWeight: "600",
            }}
          >
            Nenhum resultado foi encontrado!
          </span>
          <span
            className="VerifiqueSeEscritaEstCorreta"
            style={{
              width: 764,
              textAlign: "center",
              color: "#9B9BB2",
              fontSize: 24,
              fontFamily: "Montserrat",
              fontWeight: "600",
            }}
          >
            Verifique se a escrita está correta
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchNotFound;
