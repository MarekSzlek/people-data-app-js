function GridViewer({ data, rows }) {
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: `repeat(${rows}, 1fr)` }}
    >
      {data.map((item, i) => (
        <div
          key={item?.id || i}
          style={{
            margin: "0.5rem",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
          }}
        >
          <div className="viewer-label">
            {Object.entries(data[i]).map((prop) => (
              <p key={prop[0]}>{prop[0]}:</p>
            ))}
          </div>
          <div className="viewer-content">
            {Object.entries(data[i]).map((prop) => (
              <p key={prop[0]}>{prop[1]}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GridViewer;
