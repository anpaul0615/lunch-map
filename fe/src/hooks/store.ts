import { useDispatch, useSelector } from "react-redux";

import { loadRegisteredStores, toggleStoreForm, setStoreFormInput, appendNewStore } from "../reducers/store";

import type { EditableStoreProperties } from '../types/store';
import type { RootState } from "../types";

/**
 * Store
 */
export function useStore() {
  const stores = useSelector((s: RootState) => s.StoreState.stores);

  const dispatch = useDispatch();

  /* 식당 조회 */
  function initStores() {
    dispatch(loadRegisteredStores());
  }

  return { stores, initStores };
}

/**
 * Store Form
 */
export function useStoreForm() {
  const isOpen = useSelector((s: RootState) => s.StoreState.registration.isOpen);
  const input = useSelector((s: RootState) => s.StoreState.registration.input);

  const dispatch = useDispatch();

  /* 식당 입력모달 열기/닫기 토글 */
  function openStoreRegistrationModal() {
    dispatch(toggleStoreForm({ isOpen: true }));
  }
  function closeStoreRegistrationModal() {
    dispatch(toggleStoreForm({ isOpen: false }));
  }

  /* 식당 기본정보 입력 */
  function updateStoreFormInput(input: Partial<EditableStoreProperties>) {
    console.log('updateStoreFormInput :: ', input);
    dispatch(setStoreFormInput({ input }));
  }

  /* 식당 신규등록 */
  function addNewStore() {
    dispatch(appendNewStore({ input }));
  }

  return { isOpen, input, openStoreRegistrationModal, closeStoreRegistrationModal, updateStoreFormInput, addNewStore };
}
