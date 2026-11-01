import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-4 container border-t mt-20">
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-gray-400 text-center">
          © {new Date().getFullYear()}{" "}
          <span className="text-primary font-medium">Ari Syahputra, S.Kom</span>.
          All rights reserved.
        </p>

        <a
          href="mailto:aryrealme@gmail.com"
          className="text-sm text-gray-400 hover:text-primary transition-colors"
        >
          aryrealme@gmail.com
        </a>
      </div>
  </footer>
  );
}
