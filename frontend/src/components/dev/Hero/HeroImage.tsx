import img from "../../../assets/images/profile.png";

export default function HeroImage() {
  return (
    <div className="relative hidden lg:flex">
      <div className="absolute inset-0 rounded-full bg-primary opacity-20 blur-3xl"></div>

      <img
        src={img}
        alt="Guilherme Fonseca"
        className="relative h-[500px] w-[500px] rounded-full border border-primary/20 object-cover"
      />
    </div>
  );
}
