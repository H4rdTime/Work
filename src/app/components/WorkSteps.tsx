// src/app/components/WorkSteps.tsx
'use client'
import React from 'react'

interface Step {
  title: string;
  content: React.ReactNode;
}

interface WorkStepsProps {
  steps?: Step[];
  title?: string;
  subtitle?: string;
}

const WorkSteps: React.FC<WorkStepsProps> = ({
  steps,
  title = "КАК МЫ РАБОТАЕМ",
  subtitle = "Этапы работы — от заявки до чистой воды"
}) => {
  const defaultSteps: Step[] = [
    {
      title: 'Выезд инженера',
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Анализ грунта, подбор типа скважины</li>
        </ul>
      )
    },
    {
      title: 'Заключение договора',
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Фиксируем сроки, стоимость, гарантии.</li>
          <li>Без скрытых платежей.</li>
        </ul>
      )
    },
    {
      title: 'Бурение и обустройство',
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Используем сертифицированные материалы</li>
          <li>Минимизируем шум и грязь</li>
        </ul>
      )
    },
    {
      title: 'Пусконаладочные работы',
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Проверяем дебет воды</li>
          <li>Устанавливаем оборудование</li>
        </ul>
      )
    },
    {
      title: 'Сдача объекта',
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Подписываем акт приемки</li>
          <li>Выдаем паспорт скважины</li>
        </ul>
      )
    }
  ];

  const displayedSteps = steps || defaultSteps;

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a365d] mb-4">
          Как мы <span className="text-[#218CE9]">работаем</span>
        </h2>
        <div className="w-16 h-1 bg-[#218CE9]/30 mx-auto rounded-full" />
        <p className="mt-4 text-gray-600 max-w-xl mx-auto text-base md:text-lg">
          Прозрачный процесс от первого звонка до чистой воды в вашем кране
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {displayedSteps.slice(0, 3).map((step, index) => (
          <div 
            key={index}
            className="bg-[#F5F5F5] rounded-xl p-6 shadow-lg flex flex-col h-full"
          >
            <div className="flex gap-4 mb-4 items-center">
              <div className="w-8 h-8 bg-[#218CE9] text-white rounded-full flex items-center justify-center flex-shrink-0">
                {index + 1}
              </div>
              <h4 className="text-xl font-bold text-[#218CE9]">
                {step.title}
              </h4>
            </div>
            <div className="text-[#666] flex-grow">
              {step.content}
            </div>
          </div>
        ))}

        <div className="lg:col-span-3 flex flex-col lg:flex-row gap-8">
          {displayedSteps.slice(3).map((step, index) => (
            <div 
              key={index + 3}
              className="bg-[#F5F5F5] rounded-xl p-6 shadow-lg flex flex-col h-full w-full"
            >
              <div className="flex gap-4 mb-4 items-center">
                <div className="w-8 h-8 bg-[#218CE9] text-white rounded-full flex items-center justify-center flex-shrink-0">
                  {index + 4}
                </div>
                <h4 className="text-xl font-bold text-[#218CE9]">
                  {step.title}
                </h4>
              </div>
              <div className="text-[#666] flex-grow">
                {step.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WorkSteps