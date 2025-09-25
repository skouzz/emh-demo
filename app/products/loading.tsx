export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emh-red mb-6"></div>
      <p className="text-emh-red text-lg font-semibold">Chargement des produits...</p>
    </div>
  );
}
