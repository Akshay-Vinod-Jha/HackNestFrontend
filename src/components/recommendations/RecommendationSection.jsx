export default function RecommendationSection({ title, description, icon: Icon, items, renderItem }) {
  if (!items || items.length === 0) {
    return (
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-50 rounded-xl">
            <Icon className="w-5 h-5 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">{title}</h2>
        </div>
        <p className="text-gray-500 font-medium mb-6">{description}</p>
        <div className="bg-gray-50 border border-dashed border-gray-200 rounded-3xl p-10 text-center">
          <p className="text-gray-500 font-bold">We don't have enough data to generate these recommendations yet.</p>
          <p className="text-sm text-gray-400 mt-2">Try updating your profile or exploring more to improve our algorithm.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-indigo-50 rounded-xl">
          <Icon className="w-5 h-5 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900">{title}</h2>
      </div>
      <p className="text-gray-500 font-medium mb-6">{description}</p>
      
      {/* Horizontal scrollable row to keep the page compact vertically */}
      <div className="flex overflow-x-auto pb-6 gap-6 snap-x -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar">
        {items.map((item, index) => (
          <div key={item.id || index} className="w-[300px] shrink-0 snap-start">
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
}
