import { fireEvent, screen } from "@testing-library/react";

export const selectFieldInput = async (
  fieldTestId: string,
  optionToChoose: string
) => {
  const selectField = screen.getByTestId(fieldTestId);

  fireEvent.click(selectField);

  const option = await screen.findByTestId("option-" + optionToChoose);

  fireEvent.click(option);
};
