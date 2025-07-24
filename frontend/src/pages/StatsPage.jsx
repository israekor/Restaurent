import StatistiquesVentes from '../components/StatistiquesVentes';
import TauxOccupationTables from '../components/TauxOccupation';
import PerformanceEmployes from '../components/PerformanceEmployes';
import PlatsVendusParType from '../components/PlatsVendusParType';

const StatsPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 auto-rows-min">
      <StatistiquesVentes />
      <TauxOccupationTables />
      <PerformanceEmployes />
      <PlatsVendusParType />
    </div>
  );
};

export default StatsPage;
