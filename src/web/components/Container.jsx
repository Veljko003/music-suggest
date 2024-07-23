const Container = ({ children }) => (
  <div
    style={{
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.6)"
    }}>
    {children}
  </div>
)

export default Container
