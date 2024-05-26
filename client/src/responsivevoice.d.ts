declare namespace responsiveVoice {
  interface Voice {
      name: string;
      lang: string;
      rate: number;
  }

  function speak(text: string, voiceName?: VoiceName, parameters?: object): void;
  function getVoices(): Voice[];
}

type VoiceName = "UK English Male" | "UK English Female" | "US English Male" | "US English Female" | "Australian Female" | "Dutch Female" | "Japanese Female";

declare var responsiveVoice: responsiveVoice;