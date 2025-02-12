// src/app/components/WorkSteps.tsx
'use client'
import React from 'react'

const WorkSteps = () => {
  const steps = [
    {
      title: 'Выезд инженера',
      content: (
        <>
          <ul className="list-disc pl-5 space-y-2">
            <li>Анализ грунта, подбор типа скважины</li>
          </ul>
        </>
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
  ]

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="border-b border-black border-opacity-10 mb-8"></div>

      <h2 className="text-3xl md:text-4xl font-bold text-[#218CE9] text-center mb-6">
        КАК МЫ РАБОТАЕМ
      </h2>
      
      <h3 className="text-xl text-center text-[#666] mb-8">
        Этапы работы — от заявки до чистой воды
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div 
            key={index}
            className="bg-[#F5F5F5] rounded-xl p-6 shadow-lg"
          >
            <div className="flex gap-4 mb-4 items-center">
              {/* Кружок с цифрой */}
              <div className="w-8 h-8 bg-[#218CE9] text-white rounded-full flex items-center justify-center flex-shrink-0">
                {index + 1}
              </div>
              
              {/* Название этапа */}
              <h4 className="text-xl font-bold text-[#218CE9]">
                {step.title}
              </h4>
            </div>
            
            {/* Контент этапа */}
            <div className="text-[#666]"> {/* Добавлен отступ слева */}
              {step.content}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WorkSteps