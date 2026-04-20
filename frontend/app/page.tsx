import Image from "next/image";
import { Brain, Timer, History } from "lucide-react";
export default function Home() {
  return (
    <div className="w-full h-full bg-gray-100 flex flex-col items-center relative ">
      <div className="absolute w-full lg:w-[70%] z-2  relative text-black text-[30px] font-semibold">
        <p className="absolute left-0 top-0 m-[20px] w-[370px] text-left border-b-[3px] border-gray-400 pb-[10px]">
          Развивайтесь играя в интересные игры - все подтверждено научно{" "}
        </p>
        <p className="absolute left-0 mt-[170px] text-[20px] text-gray-800 mx-[20px] w-[400px]">
          Всего пол часа в день уже дадут результат
        </p>
        <button className="bg-red-700 shadow-xs absolute rounded-[20px] ml-[50px] w-[170px] h-[60px] text-[20px] m-[20px] mt-[250px] text-white font-semibold">
          Играть
        </button>
      </div>
      <img
        src="/older-bg7.jpg"
        className=" w-screen  z-1 h-[600px]  object-cover block scale-x-[-1] "
      />
      <div className="w-full h-[10px] bg-emerald-400"></div>

      <div className="w-full max-w-[1100px] flex flex-col items-center">
        <div className="w-full max-w-[1100px] flex flex-col items-center"></div>
        <div className="bg-gray-100 w-full p-[20px] pb-[50px] ">
          <p className="text-[20px] font-semibold mt-[30px] mb-[10px]">
            {" "}
            Деменция - проблема, которую нельзя игнорировать
          </p>
          <p>
            Каждые три секунду в мире кому-то ставят диагноз 'деменция'. Сейчас
            с ней живут более 55 миллионов человек. До 45% этих случаев деменции
            могли были быть предотвращены или отсрочены. Коснется ли она вас?
            Давайте посмотрим
          </p>

          <div className="w-full flex-row">
            <h2 className="text-3xl font-bold text-center text-stone-800 mb-2">
              Возраст и риск деменции
            </h2>

            <p className="text-center text-stone-600 mb-10">
              С каждым десятилетием риск растёт
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="bg-emerald-50 p-4 rounded-xl border-emerald-300 border-[1px]  text-center">
                <div className="text-sm text-stone-500">60–64 лет</div>
                <div className="text-2xl font-bold">~1%</div>
              </div>
              <div className="bg-emerald-100 p-4 border-[1px] border-green-400 rounded-xl text-center">
                <div className="text-sm text-stone-500">65–74 лет</div>
                <div className="text-2xl font-bold">~5%</div>
              </div>
              <div className="bg-yellow-100 border-yellow-300 border-[1px]  p-4 rounded-xl text-center">
                <div className="text-sm text-stone-500">75–84 лет</div>
                <div className="text-2xl font-bold">~15%</div>
              </div>
              <div className="bg-orange-200 border-[1px] border-orange-300 p-4 rounded-xl text-center">
                <div className="text-sm text-orange-800">85–89 лет</div>
                <div className="text-2xl text-orange-900 font-bold">~30%</div>
              </div>
              <div className="bg-red-200 p-4 border-[1px] border-red-400 rounded-xl text-center">
                <div className="text-sm text-red-900">90+ лет</div>
                <div className="text-2xl font-bold text-red-900">~35–40%</div>
              </div>
            </div>
          </div>
          <p className=" text-gray-700 text-center mt-[10px] text-[12px]">
            «Данные основаны на исследованиях Alzheimer’s Disease International,
            ВОЗ и анализе российских когортных исследований (2020–2025)».
          </p>
        </div>
        <div className="w-full bg-emerald-200 border-y-[1px] border-emerald-300 p-[20px]">
          <p className="font-semibold text-[20px]">
            Деменция - это не приговор. Мозг можно тренировать в любом возрасте
          </p>
          <p className="mt-[10px]">
            Представьте, что ваш мозг — это лесная тропинка. Если по ней ходить
            каждый день, она не зарастает. Наши игры — те самые ежедневные
            прогулки для вашего ума. Никакой магии, только доказанная
            нейробиология
          </p>
          <div className="flex flex-row justify-center mt-[20px] px-[20px]">
            <div className="flex flex-col w-[220px] px-[10px] border-r-[1px] border-emerald-300 text-center items-center">
              <Brain className="text-[20px] h-[20px]"></Brain>
              <p className="font-semibold">Нейропластичность</p>
              <p>
                Мозг способен создавать новые связи даже в 80 лет. Каждая игра —
                это «мостик» между нейронами.
              </p>
            </div>
            <div className="flex flex-col  w-[200px] mx-[10px]  text-center items-center">
              <Timer className="text-[20px] h-[20px]"></Timer>
              <p className="font-semibold">Скорость обработки</p>
              <p>
                Тренировка реакции напрямую снижает риск деменции на 25–30%
                (исследование ACTIVE, 20 лет наблюдений).
              </p>
            </div>
            <div className="flex flex-col w-[220px] px-[10px] border-l-[1px] border-emerald-300 mx-[10px] text-center items-center">
              <Timer className="text-[20px] h-[20px]"></Timer>
              <p className="font-semibold">Рабочая память</p>
              <p>
                Упражнения на запоминание последовательностей улучшают
                повседневные навыки: список покупок, маршруты, имена.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-50">
          <p>Самое действенное средство</p>
          <p>
            20-летнее исследование ACTIVE, показало что те, кто прошел
            тренировка на скорость обработки информации снизили свой риск
            деменции на 25-29%. Double Decision (Двойное решение) - простая
            игра, в центре экрана появляется обьект который нужно запомнить,
            одновременно в углу экрана мелькает другой обьект. Задача быстро
            определить, какой обьект был в углу.
          </p>
          <p>Звучит легко, дополнительный эффект от этой игры включает</p>
          <p>
            Снижение риска попасть в ДТП по свеой вине на 48% (у пожилых
            водителей), снижение риска депрессии на 38%, улучшение способности
            жить самостоятельно
          </p>
        </div>
      </div>
    </div>
  );
}
