import { CircleSVG } from '@/lib/utils/assets/svgs/circle';
import { PolygonSVG } from '@/lib/utils/assets/svgs/polygon';
import { ICustomShapeComponentProps } from '@/lib/utils/interfaces';

export default function CustomShape({
  selected,
  onClick,
}: ICustomShapeComponentProps) {
  const items = [
    {
      value: 'radius',
      child: (
        <>
          <CircleSVG strokeColor={selected === 'radius' ? 'white' : 'black'} />
          <p className="mt-2 text-center">Circle</p>
        </>
      ),
    },
    {
      value: 'polygon',
      child: (
        <>
          <PolygonSVG
            strokeColor={selected === 'polygon' ? 'white' : 'black'}
          />
          <p className="mt-2 text-center">Polygon</p>
        </>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
      {items.map((item, index: number) => {
        return (
          <button
            key={`${item.value}-${index}`}
            className={`flex flex-col items-center justify-center p-3 ${
              item.value === selected
                ? 'bg-black text-white'
                : 'bg-[#F4F4F5] text-black'
            } rounded-lg shadow w-30 h-30 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none active:bg-gray-800`}
            onClick={() => onClick(item.value)}
          >
            {item.child}
          </button>
        );
      })}
    </div>
  );
}
