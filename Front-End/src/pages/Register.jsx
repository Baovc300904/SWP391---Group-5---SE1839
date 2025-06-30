import RegisterForm from "../components/Register/RegisterForm";

export default function Register() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: `url("https://www.freevector.com/uploads/vector/preview/71468/vecteezyevents-world-blood-donor-day-backgrounddp0422_generated.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
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
        <RegisterForm />
      </div>
    </div>
  );
}
