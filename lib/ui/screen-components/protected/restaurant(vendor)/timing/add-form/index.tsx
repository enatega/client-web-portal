'use client';
import CustomButton from '@/lib/ui/useable-components/button';
import CustomTimeInput from '@/lib/ui/useable-components/time-input';
import Toggle from '@/lib/ui/useable-components/toggle';
import { Form, Formik } from 'formik';

type TimeSlot = {
  startTime: Date | null;
  endTime: Date | null;
};

const TimingAddForm = () => {
  let initialValues: {
    day: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
    times: {
      startTime: null;
      endTime: null;
    }[];
  }[] = [
    {
      day: 'MON',
      times: [
        {
          startTime: null,
          endTime: null,
        },
      ],
    },
    {
      day: 'TUE',
      times: [
        {
          startTime: null,
          endTime: null,
        },
        {
          startTime: null,
          endTime: null,
        },
      ],
    },
    {
      day: 'WED',
      times: [],
    },
  ];

  //  const {
  //    data,
  //    error: errorQuery,
  //    loading: loadingQuery,
  //  } = useQuery(GET_RESTAURANT_PROFILE, {
  //    variables: { id: restaurantId },
  //  });

  return (
    <div className="mt-7 rounded border px-8 py-8">
      <div>
        <Formik
          initialValues={initialValues}
          // validationSchema={TippingSchema}
          onSubmit={() => {}}
          validateOnChange
          enableReinitialize
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form
              onClick={() => {
                console.log(values);
              }}
              className="flex flex-col gap-6"
            >
              {values.map((value, dayIndex) => {
                return (
                  <div className="flex items-start gap-5">
                    {/* left side */}
                    <div className="mt-2 flex items-center gap-4">
                      <Toggle
                        onClick={() => {
                          const newTimes =
                            value.times.length > 0
                              ? []
                              : [{ startTime: null, endTime: null }];
                          setFieldValue(`${dayIndex}.times`, newTimes);
                        }}
                        checked={value.times.length > 0}
                      />
                      {/* <span className="text-sm">{getFullDayName(v.day)}</span> */}
                      <span className="w-10 text-sm">{value.day}</span>
                    </div>

                    {/* center */}
                    {value.times.length > 0 ? (
                      <div className="flex flex-col gap-2">
                        {value.times?.map((time: TimeSlot, timeIndex) => {
                          return (
                            <div className="flex items-center gap-4">
                              <CustomTimeInput
                                showLabel={false}
                                value={time.startTime}
                                className="w-40"
                                placeholder="Start Time"
                              />
                              <span>-</span>
                              <CustomTimeInput
                                showLabel={false}
                                value={time.endTime}
                                className="w-40"
                                placeholder="End Time"
                              />
                              {/* right side */}
                              {timeIndex > 0 ? (
                                <div
                                  onClick={() => {
                                    let prev = [...values[dayIndex].times];
                                    prev.splice(timeIndex, 1);
                                    setFieldValue(`${dayIndex}.times`, prev);
                                  }}
                                  className="mt-1 flex h-6 w-14 select-none items-center justify-center rounded-full border border-red-500 text-red-500 hover:cursor-pointer hover:bg-red-400 hover:text-white"
                                >
                                  -
                                </div>
                              ) : (
                                <div
                                  onClick={() => {
                                    let prev = [...values[dayIndex].times];
                                    prev.push({
                                      startTime: null,
                                      endTime: null,
                                    });
                                    console.log(prev);
                                    setFieldValue(`${dayIndex}.times`, prev);
                                  }}
                                  className="mt-1 flex h-6 w-14 select-none items-center justify-center rounded-full border border-primary-color text-primary-color hover:cursor-pointer hover:bg-secondary-color hover:text-white"
                                >
                                  +
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex min-h-10 flex-1 items-center justify-start">
                        <span className="select-none rounded-full bg-black px-3 py-1 text-xs text-white">
                          Closed all Day
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}

              <CustomButton
                className="mb-[2px] mr-auto mt-auto flex h-11 rounded-md border-gray-300 bg-[black] px-10 text-white"
                // label={data?.tips._id ? 'Update' : 'Add'}
                label={'Save'}
                rounded={false}
                type="submit"
                // loading={mutationLoading}
                // disabled={mutationLoading}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TimingAddForm;

const abc = [
  {
    day: 'WED',
    times: [
      {
        startTime: null,
        endTime: null,
      },
    ],
  },
  {
    day: 'THU',
    times: [
      {
        startTime: null,
        endTime: null,
      },
    ],
  },
  {
    day: 'FRI',
    times: [
      {
        startTime: null,
        endTime: null,
      },
    ],
  },
  {
    day: 'SAT',
    times: [
      {
        startTime: null,
        endTime: null,
      },
    ],
  },
  {
    day: 'SUN',
    times: [
      {
        startTime: null,
        endTime: null,
      },
    ],
  },
];
