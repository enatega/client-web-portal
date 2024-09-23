import { IGlobalSVGProps } from '../../interfaces/svg.interface';

export function PolygonSVG({
  width = '35',
  height = '48',
  strokeColor = 'white',
  ...props
}: IGlobalSVGProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 47 35"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M46.8349 4.50724C46.8349 6.62923 45.1147 8.34944 42.9927 8.34944C42.9657 8.34944 42.9388 8.34916 42.9119 8.3486L40.8853 18.5323C42.1359 19.166 42.9932 20.4637 42.9932 21.9617C42.9932 24.0837 41.2729 25.8039 39.151 25.8039C37.029 25.8039 35.3088 24.0837 35.3088 21.9617C35.3088 21.0503 35.626 20.2131 36.1562 19.5544L33.6504 17.8093C32.9459 18.6774 31.8704 19.2322 30.6653 19.2322C30.1158 19.2322 29.5932 19.1169 29.1205 18.9091L23.5496 27.841C24.3764 28.5457 24.9007 29.5948 24.9007 30.7664C24.9007 32.8883 23.1805 34.6086 21.0585 34.6086C18.9365 34.6086 17.2163 32.8883 17.2163 30.7664C17.2163 29.3262 18.0086 28.0711 19.1811 27.4133L11.4379 9.09526C11.1115 9.1854 10.7677 9.23355 10.4127 9.23355C9.91678 9.23355 9.44282 9.13961 9.00764 8.96854L6.28714 13.8994C7.2362 14.599 7.85188 15.7247 7.85188 16.9942C7.85188 19.1162 6.13167 20.8364 4.00968 20.8364C1.88769 20.8364 0.16748 19.1162 0.16748 16.9942C0.16748 14.8722 1.88769 13.152 4.00968 13.152C4.50448 13.152 4.97743 13.2455 5.41182 13.4159L8.13271 8.48428C7.18508 7.78456 6.57048 6.65973 6.57048 5.39135C6.57048 3.26936 8.29069 1.54915 10.4127 1.54915C12.5347 1.54915 14.2549 3.26936 14.2549 5.39135C14.2549 6.80323 13.4933 8.03724 12.3586 8.70504L20.1099 27.0421C20.4133 26.9651 20.7311 26.9242 21.0585 26.9242C21.6499 26.9242 22.2101 27.0578 22.7106 27.2965L28.2653 18.3906C27.3861 17.6865 26.8231 16.604 26.8231 15.39C26.8231 13.2681 28.5433 11.5479 30.6653 11.5479C32.7873 11.5479 34.5075 13.2681 34.5075 15.39C34.5075 15.9478 34.3887 16.4777 34.1749 16.956L36.8956 18.8507C37.529 18.3907 38.3083 18.1195 39.151 18.1195C39.4186 18.1195 39.6798 18.1468 39.932 18.1989L41.9222 8.19832C40.3211 7.73476 39.1506 6.2577 39.1506 4.50724C39.1506 2.38525 40.8708 0.665039 42.9927 0.665039C45.1147 0.665039 46.8349 2.38525 46.8349 4.50724Z"
        stroke={strokeColor}
      />
    </svg>
  );
}
