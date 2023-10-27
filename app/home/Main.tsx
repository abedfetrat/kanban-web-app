import Button from "@/components/Button";

export default function Main() {
  return (
    <main className="grid flex-1 place-items-center px-4 pt-6 md:px-6">
      <section className="text-center">
        <p className="text-lg font-bold text-medium-grey">
          This board is empty. Create a new column to get started.
        </p>
        <Button size="large" className="mt-6" color="primary">
          + Add New Column
        </Button>
      </section>
    </main>
  );
}
