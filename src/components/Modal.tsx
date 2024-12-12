import React from 'react'; 

interface ModalProps {
    isOpen: boolean;
    onClose: () => void; 
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, children}) => {
    if(!isOpen) return null;


    return (
        <div className='fixed top-0 left-0 w-[100%] h-[100%] bg-[#000000] flex justify-center align-center'>
            <div className='bg-white p-4 border-[8px] w-max-[500px] w-[100%] '>
                <button onClick={onClose} className='bg-transparent border-transparent font-[1.5rem] cursor-pointer absolute top-[10px] right-[10px]'>&times;</button>
                <div className='self-center'>
                    {children}
                </div>
            </div>
        </div>
    );


};

export default Modal;