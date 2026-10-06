export default function Logo() {
  return (
    <a
      href="#home"
      aria-label="Fonseca Social Media — início"
      className="flex shrink-0 items-center gap-2"
    >
      <img
        src="/fonseca-socialmedia-mark.svg"
        alt=""
        aria-hidden="true"
        className="size-8 sm:size-9"
      />
      <span className="flex flex-col gap-1 leading-none">
        <span className="text-sm font-black tracking-[0.12em] text-white sm:text-base">
          Fonseca
        </span>
        <span className="text-[7px] font-semibold uppercase tracking-[0.24em] text-primary sm:text-[8px]">
          Social Media
        </span>
      </span>
    </a>
  );
}
