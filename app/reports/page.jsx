import ReportFiltersBar from "./components/ReportFiltersBar";
import ReportTable from "./components/ReportTable";

export default function ReportsPage() {
  return (
    <div className="p-4">
      <section className="w-full">
        <ReportFiltersBar/>
        <ReportTable/>
      </section>
    </div>
  );
}
