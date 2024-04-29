import classNames from "classnames";
import {
  RunpodModelType,
  RunpodSupportedLanguages,
} from "frontend_tts_lib/types";



export type ModelConfigFormProps =  React.HTMLAttributes<HTMLDivElement>

export const ModelConfigForm: React.FC<ModelConfigFormProps> = () => {
  const models = Object.values(RunpodModelType);
  const languages = Object.keys(RunpodSupportedLanguages);
  languages.unshift("Auto Detect");

  const header_class = classNames("col-span-2 text-center text-xl font-semibold mt-4");
  const form_field_class = classNames("text-center");
  return (
    <div className="grid grid-cols-[1fr_120px] gap-x-2 gap-y-[1px] w-[min(440px,90vw)] border-slate-700 border-[1px] border-solid rounded-xl px-2 pb-10">
        <span className={header_class}>Basic Model Configuration</span>
      <label htmlFor="model">Whisper Model</label>
      <select className={form_field_class} name="model" id="model" defaultValue={RunpodModelType.BASE}>
        {models.map((model) => (
          <option
            key={model}
            value={model}
          >
            {model}
          </option>
        ))}
      </select>
      <label htmlFor="language">Language</label>
      <select className={form_field_class} name="language" id="language" defaultValue={"Auto Detect"}>
        {languages.map((lang) => (
          <option key={lang} value={lang == "Auto Detect" ? undefined : lang.toString()}>
            {lang}
          </option>
        ))}
      </select>
      <label htmlFor="initial_prompt">Initial Prompt</label>
      <input className={form_field_class} type="text" name="initial_prompt" id="initial_prompt" />
        <span className={header_class}>Advanced Model Configuration</span>
      <label htmlFor="temperature">Temperature</label>
      <input className={form_field_class} type="number" name="temperature" id="temperature" step={0.05} defaultValue={0} />
      <label htmlFor="best_of">Best of Candidates</label>
      <input className={form_field_class} type="number" name="best_of" id="best_of" pattern="[0-9]" step={1} defaultValue={5} />
      <label htmlFor="beam_size">Beam Size</label>
      <input className={form_field_class} type="text" name="beam_size" id="beam_size" pattern="[0-9]" step={1} defaultValue={5} />
      <label htmlFor="patience">Patience</label>
      <input className={form_field_class} type="number" name="patience" id="patience" step={0.05} defaultValue={1}/>
      <label htmlFor="Supressed Token IDs">suppress_tokens</label>
      <input className={form_field_class} type="text" name="suppress_tokens" id="suppress_tokens" defaultValue={-1} />
      <label htmlFor="condition_on_previous_text">
        Condition on previous text
      </label>
      <input
        type="checkbox"
        name="condition_on_previous_text"
        id="condition_on_previous_text"
        className={form_field_class}
      />
      <label htmlFor="temperature_increment_on_fallback">
        Temperature increment on fallback
      </label>
      <input
        type="number"
        name="temperature_increment_on_fallback"
        id="temperature_increment_on_fallback"
        step={0.05}
        defaultValue={0.2}
        className={form_field_class}
      />
      <label htmlFor="compression_ratio_threshold">
        Compression ratio threshold
      </label>
      <input
        type="number"
        name="compression_ratio_threshold"
        id="compression_ratio_threshold"
        step={0.05}
        defaultValue={2.4}
        className={form_field_class}
      />
      <label htmlFor="logprob_threshold">Logprob threshold</label>
      <input className={form_field_class} type="number" name="logprob_threshold" id="logprob_threshold" step={0.05} defaultValue={-1} />
      <label htmlFor="word_timestamps">Word timestamps</label>
      <input className={form_field_class} type="checkbox" name="word_timestamps" id="word_timestamps" />
      <label htmlFor="no_speech_threshold">No Speech Threshold</label>
      <input className={form_field_class} type="number" name="no_speech_threshold" id="no_speech_threshold" step={0.05} defaultValue={0.6} />
    </div>
  );
};
