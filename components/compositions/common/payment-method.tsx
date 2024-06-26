import { Description, Label } from '@/components/fieldset';
import { Radio, RadioField, RadioGroup } from '@/components/radio';

function PaymentMothod({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (value: string) => void;
}) {
  return (
    <RadioGroup value={selected} onChange={setSelected}>
      <RadioField>
        <Radio color='amber' value='manual' />
        <Label>Manual Bank Transfer</Label>
        <Description>
          Transfer funds directly to our bank account. Share the payment receipt
          on WhatsApp for confirmation.
        </Description>
      </RadioField>
      <RadioField>
        <Radio color='amber' value='online' />
        <Label>Online Payment Gateway</Label>
        <Description>
          Use our secure online payment gateway to complete your booking
          instantly.
        </Description>
      </RadioField>
    </RadioGroup>
  );
}

export default PaymentMothod;
