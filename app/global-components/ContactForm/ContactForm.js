'use client';
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';

export default function ContactForm() {
  const formHandler = (event) => {
    event.preventDefault();
  };

  return (
    <form className="mt-6 w-full max-w-140 xl:max-w-xl" onSubmit={formHandler}>
      <div className="flex mt-3 lg:justify-end">
        <ButtonPrimary
          style={{
            transform: 'scale(3)',
          }}
        >
          {'узнать свободную дату'.toUpperCase()}
        </ButtonPrimary>
      </div>
    </form>
  );
}
