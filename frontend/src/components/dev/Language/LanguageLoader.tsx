type Props = {
  open: boolean;
};

export default function LanguageLoader({ open }: Props) {
  if (!open) return null;

  return (
    <div className="fixed left-0 top-0 z-[999999] h-screen w-screen bg-bg/95 backdrop-blur-md">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-[5px] border-primary/20 border-t-primary" />

        <h2 className="mt-8 text-3xl font-bold text-secondaryText">
          Switching language...
        </h2>

        <p className="mt-3 text-secondaryText/70">Please wait a moment</p>
      </div>
    </div>
  );
}
