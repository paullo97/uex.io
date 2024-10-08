import { Map } from "../../../components/map";

const ShowMap = ({
    marcadores,
    latitude = '-15.793889',
    longitude = '-47.882778'
}) => {
  return (
    <div style={{ width: "100%", border: "solid red 1px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          borderBottom: "solid black 2px",
        }}
      >
        <h3>Map</h3>
      </div>

      <Map
        latitude={latitude}
        longitude={longitude}
        width="100%"
        height="91%"
        marcadores={marcadores}
      />
    </div>
  );
};

export default ShowMap;
