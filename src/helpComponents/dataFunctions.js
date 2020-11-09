import React from "react";

export const SizeNameArray = (windowWidth) => {
    let sizeArray = [
        { id: 0, size: 75, name: "№ проекту", fullName: "Затверджений номер проекту" },
        { id: 1, size: 50, name: "Строк дог.", fullName: "Крайня дата виконання проекту згізно з договором" },
        { id: 2, size: 30, name: "Підп.", fullName: "Наявність підписаного кліентом договору" },
        { id: 3, size: 30, name: "Пакет", fullName: "Наявність повного пакету документів" },
        { id: 4, size: 25, name: "ТД", fullName: "Наявність завершеної технічної документації з землеустрою та XML." },
        { id: 5, size: 25, name: "Екс", fullName: "Наявність отриманного висновку після завершення екстеріторіального погодження" },
        { id: 6, size: 25, name: "ДЗК", fullName: "Наявність отриманного витягу з ДЗК" },
        { id: 7, size: 20, name: "%", fullName: "Відсоток виконання проекту станом на сьогодні" },
        { id: 8, size: 100, name: "Сума", fullName: "Повна вартість проекту" },
        { id: 9, size: 100, name: "Розрахунок ", fullName: "Розрахунок " },
        { id: 10, size: 100, name: "Відповідальний", fullName: "Відповідальний" },
        { id: 11, size: 100, name: "Виконавець", fullName: "Виконавець" },
        { id: 12, size: 100, name: "Термін", fullName: "Термін" },
        { id: 13, size: 150, name: "Термін", fullName: "Термін" },
    ];
    if (windowWidth > 800) {
        sizeArray = [
            { id: 0, size: 80, name: "№ проекту", fullName: "Затверджений номер проекту" },
            { id: 1, size: 80, name: "Строк договору", fullName: "Крайня дата виконання проекту згізно з договором" },
            { id: 2, size: 70, name: "Підпис клієнта", fullName: "Наявність підписаного кліентом договору" },
            { id: 3, size: 90, name: "Пакет документів", fullName: "Наявність повного пакету документів" },
            { id: 4, size: 90, name: "Тех. документація", fullName: "Наявність завершеної технічної документації з землеустрою та XML." },
            { id: 5, size: 70, name: "Екст. погод.", fullName: "Наявність отриманного висновку після завершення екстеріторіального погодження" },
            { id: 6, size: 70, name: "ДЗК", fullName: "Наявність отриманного витягу з ДЗК" },
            { id: 7, size: 100, name: "%", fullName: "Відсоток виконання проекту станом на сьогодні" },
            { id: 8, size: 100, name: "Сума", fullName: "Повна вартість проекту" },
            { id: 9, size: 100, name: "Розрахунок ", fullName: "Розрахунок " },
            { id: 10, size: 100, name: "Відповідальний", fullName: "Відповідальний" },
            { id: 11, size: 100, name: "Виконавець", fullName: "Виконавець" },
            { id: 12, size: 100, name: "Термін", fullName: "Термін" },
            { id: 13, size: 150, name: "Термін", fullName: "Термін" },
        ]
    }
    return sizeArray;
}

export const ProjectDataArray = (project) => {
    const projectDataArray = [
        project.projectNumber,
        project.projectReadinessDate,
        project.contractExistence,
        project.signaturуOfAct,
        project.poketExistence,
        project.signaturуOfAct,
        project.poketExistence,
        project.percentageOfWork,
        project.paymentDate,
        project.amountOfDebt,
        project.responsibleForLandManage,
        project.contractor,
        project.termOfPerformance,
        project.fullCalculation,
    ];
    return projectDataArray;
}

const summArray = (numb, sizeArray) => {
    let i = 0;
    let summ = 0;
    while (i < numb) {
        summ = summ + sizeArray[i].size;
        i++;
    }
    return summ;
};

export const ProgectHeadTable = (windowWidth, sizeArray, setFunct, setModalText, setModalClass) => {
    const renderBody = sizeArray.map((item) => {
        if (windowWidth > 75 + summArray(item.id + 1, sizeArray)) {
            return (
                <td key={item.id} width={item.size}
                    onClick={() => {
                        setFunct("showFunction");
                        setModalText(item.fullName);
                        setModalClass();
                    }}
                >
                    <small>{item.name}</small>
                </td>
            )
        }
        
        return null;
    })
    return renderBody;
}

export const classNamesDataArray = () => {
    const classNamesArray = [
        { class: "head" },
        // project.projectReadinessDate,
        // project.contractExistence,
        // project.signaturуOfAct,
        // project.poketExistence,
        // project.signaturуOfAct,
        // project.poketExistence,
        // project.percentageOfWork,
        // project.paymentDate,
        // project.amountOfDebt,
        // project.responsibleForLandManage,
        // project.contractor,
        // project.termOfPerformance,
        // project.fullCalculation,
    ];
    return classNamesArray;
}

export const ProgectBodyTable = (sizeArray, projectDataArray, projectReadinessDateClass, signaturуOfActClass) => {
    const renderBody = sizeArray.map((item) => {
        return (
            <td key={item.id} width={item.size} className={`head ${projectReadinessDateClass} ${signaturуOfActClass}`}>
                <small className="projectName"
                >{projectDataArray[item.id]}</small>
            </td>
        )
    })
    return renderBody;
} 