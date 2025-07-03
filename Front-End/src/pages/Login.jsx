import AppHeader from "../components/Login/AppHeader/AppHeader";
import LoginCard from "../components/Login/Card/LoginCard";

export default function Login() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: `url("https://www.freevector.com/uploads/vector/preview/71468/vecteezyevents-world-blood-donor-day-backgrounddp0422_generated.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: 24,
        }}
      >
        <LoginCard />
      </div>
    </div>
  );
}
