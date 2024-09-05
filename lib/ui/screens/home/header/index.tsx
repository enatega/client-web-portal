import { IHeaderTabsItem } from '@/lib/utils/interfaces';

export default function HomeHeader() {
  const items: IHeaderTabsItem[] = [
    {
      name: 'Discovery',
      icon: 'pi pi-home',
    },
    {
      name: 'Restaurants',
      icon: 'pi pi-home',
    },
    {
      name: 'Store',
      icon: 'pi pi-home',
    },
  ];

  // Handlers
  const onTemplateRender = (item: IHeaderTabsItem) => {
    return (
      <div className="flex gap-2 items-center bg-[#63abcd] text-cyan-50 p-2 border-2 rounded-full cursor-pointer">
        <i className={item.icon} />
        <span>{item.name}</span>
      </div>
    );
  };

  return (
    <div className="w-full pt-4">
      <div className="flex justify-center">
        <div className="flex gap-2">{items.map(onTemplateRender)}</div>
      </div>
    </div>
  );
}
