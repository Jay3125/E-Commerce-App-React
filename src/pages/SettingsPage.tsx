import { useState, type FormEvent } from "react";
import { PageHeading } from "../components/PageHeading";

export type StoreSettings = {
  storeName: string;
  email: string;
  currency: string;
};

type SettingsPageProps = {
  settings: StoreSettings;
  onSave: (settings: StoreSettings) => void;
};

export function SettingsPage({ settings, onSave }: SettingsPageProps) {
  const [draft, setDraft] = useState(settings);
  const [saved, setSaved] = useState(false);

  function saveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave(draft);
    setSaved(true);
  }

  return (
    <>
      <PageHeading
        eyebrow="YOUR WORKSPACE"
        title="Settings"
        description="Update your store details and preferences."
      />
      <form className="panel settings-panel" onSubmit={saveSettings}>
        <div className="settings-section-heading">
          <h2>Store details</h2>
          <p>These details are shown across your store and customer emails.</p>
        </div>
        <label className="settings-field">
          <span>Store name</span>
          <input
            value={draft.storeName}
            onChange={(event) => {
              setDraft({ ...draft, storeName: event.target.value });
              setSaved(false);
            }}
            required
          />
        </label>
        <label className="settings-field">
          <span>Contact email</span>
          <input
            type="email"
            value={draft.email}
            onChange={(event) => {
              setDraft({ ...draft, email: event.target.value });
              setSaved(false);
            }}
            required
          />
        </label>
        <label className="settings-field">
          <span>Store currency</span>
          <select
            value={draft.currency}
            onChange={(event) => {
              setDraft({ ...draft, currency: event.target.value });
              setSaved(false);
            }}
          >
            <option>USD — US Dollar</option>
            <option>EUR — Euro</option>
            <option>GBP — British Pound</option>
            <option>CAD — Canadian Dollar</option>
            <option>INR — Indian Rupee</option>
          </select>
        </label>
        <div className="settings-actions">
          {saved && <span role="status">Settings saved.</span>}
          <button className="button button-primary" type="submit">
            Save changes
          </button>
        </div>
      </form>
    </>
  );
}
