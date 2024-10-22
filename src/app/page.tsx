'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Components
import Container from '@/components/container';
import Button, { AddButton, RemoveButton } from '@/components/button';
import Progress from '@/components/progress';
import Slider from '@/components/slider';
import Input from '@/components/input';

export default function Home() {
  const router = useRouter();
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>(0);
  const [currentCount, setCurrentCount] = useState<number>(1);
  const [currentNumber, setCurrentNumber] = useState<number>(1);
  const [hiddenName, setHiddenName] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<number>(1);
  const [names, setNames] = useState<string[]>(['']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from submitting

    if (names.length === 1 && names[0] === '') {
      alert('Please enter at least one name.');
      return;
    }

    if (names.some((name) => name === '')) {
      alert('Please fill in all the fields.');
      return;
    }

    setIsStarted(true); // Set the game to started

    const interval = setInterval(() => {
      setCurrent((prev) => {
        if (prev > minutes) {
          clearInterval(interval);
          setIsEnded(true);
          return 1;
        }
        return prev + minutes / 60;
      });
    }, 1000);
  };

  // Add the keydown event listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isStarted && !isEnded) {
        setCurrentCount((prev) => prev + 1);
        setCurrentNumber((prev) => (prev === names.length ? 1 : prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown); // Cleanup on unmount
    };
  }, [isStarted, isEnded, names]);

  const handleChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newNames = [...names];
      newNames[index] = e.target.value; // Update the value of a specific index
      setNames(newNames);
    };

  const handleSliderChange = (number: number) => {
    setMinutes(number); // Set the value of the slider
  };

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHiddenName(e.target.checked); // Set the value of the checkbox
  };

  const addNameField = () => {
    setNames((prev) => [...prev, '']); // Add new empty name field
  };

  const clearNames = (index: number) => {
    const newNames = [...names];
    newNames[index] = ''; // Set the value of a specific index to an empty string
    setNames(newNames);
  };

  const removeNameField = (index: number) => {
    const newNames = [...names];
    newNames.splice(index, 1); // Remove the value of a specific index
    setNames(newNames);
  };

  const handleRestart = () => {
    setIsStarted(false);
    setIsEnded(false);
    setCurrent(0);
    setCurrentCount(1);
    setCurrentNumber(1);
  };

  const handleRedirect = () => {
    router.push(process.env.NEXT_PUBLIC_REDIRECT_URL ?? '/');
  };

  return (
    <Container>
      {!isStarted ? (
        <form
          className="flex w-full max-w-md flex-col space-y-4"
          onSubmit={handleSubmit}
        >
          {names.map((name, index) => (
            <div key={index} className="relative mt-3 flex w-full">
              <Input
                url={name}
                placeholder="Name"
                className="relative mr-2 w-full"
                onChange={handleChange(index)}
                clearName={() => clearNames(index)}
              />
              {names.length === index + 1 ? (
                <AddButton onClick={addNameField} />
              ) : (
                <RemoveButton onClick={() => removeNameField(index)} />
              )}
            </div>
          ))}

          <Slider onChange={handleSliderChange} />

          <div className="flex pb-3">
            <input
              type="checkbox"
              onChange={handleCheckChange}
              className="mt-0.5 shrink-0 rounded border-gray-200 text-blue-600 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:checked:border-blue-500 dark:checked:bg-blue-500 dark:focus:ring-offset-gray-800"
            />
            <label className="ms-3 text-sm text-gray-500 dark:text-neutral-400">
              Hide the name of the next respondent
            </label>
          </div>

          <Button type="submit" color="primary" font="medium">
            Start Game
          </Button>
        </form>
      ) : (
        <>
          {current > 0.99 ? (
            <button
              className="relative flex w-full items-center justify-center"
              onClick={handleRestart}
            >
              <Progress min={0} max={minutes} value={current} />
            </button>
          ) : (
            <Progress min={0} max={minutes} value={current} />
          )}
          <div className="flex w-full max-w-sm justify-center pt-6">
            {!hiddenName && (
              <div className="flex w-1/2 flex-col text-center">
                <span className="px-2 text-sm font-medium text-gray-800 decoration-2 dark:text-white">
                  NEXT
                </span>
                <span className="px-2 text-2xl font-medium text-blue-600 decoration-2">
                  {names[currentNumber - 1]}
                </span>
              </div>
            )}
            <div className="flex w-1/2 flex-col text-center">
              <span className="px-2 text-sm font-medium text-gray-800 decoration-2 dark:text-white">
                COUNT
              </span>
              <span className="px-2 text-2xl font-medium text-blue-600 decoration-2">
                {currentCount}
              </span>
            </div>
          </div>
        </>
      )}
      {process.env.NEXT_PUBLIC_REDIRECT_HIDDEN !== 'true' && !isStarted && (
        <button
          className="px-2 text-sm font-medium text-blue-600 decoration-2 hover:underline dark:text-blue-500"
          onClick={handleRedirect}
        >
          {process.env.NEXT_PUBLIC_REDIRECT_TEXT ??
            'Browse GitHub for usage instructions'}
        </button>
      )}
    </Container>
  );
}
