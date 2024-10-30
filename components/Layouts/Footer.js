import { Typography } from "@material-tailwind/react";

function Footer() {
  const year = new Date().getFullYear();
  const routes = [
    {name:'Terms & Conditions', path:"/terms-conditions"},
  ]
  return (
    <footer className="py-2">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <Typography variant="small" className="font-normal text-inherit">
          &copy; {year}, All rights reserved{" "}           <a
            href='#'
            target="_blank"
            className="transition-colors hover:text-red-500 font-bold"
          >
            SASA MILANO
          </a> Powered by <a href="https://bigello.com/">Bigello</a>
        </Typography>
        <ul className="flex items-center gap-4">
          {routes.map(({ name, path }) => (
            <li key={name}>
              <Typography
                as="a"
                href={path}
                target="_blank"
                variant="small"
                className="py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
              >
                {name}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
export default Footer;
