import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default function Pagination(props) {
    const { itemsCount,itemPerPage } = props;

    const [pages, setPages] = React.useState([]);
    const [itemsCountState, setItemsCountState] = React.useState(itemsCount);

    React.useEffect(() => {        
        if (itemsCount !== itemsCountState) {
            setItemsCountState(itemsCount);
        }
    });

    React.useEffect(() => {
        var pagesCount = Math.ceil(itemsCountState / itemPerPage);
        var bindingPages = [];

        if (pagesCount <= 7) {
            bindingPages.push({ text: 1, active: true, number: 1 });

            for (var i = 1; i < pagesCount; i++) {
                bindingPages.push({ text: (i + 1), active: false, number: (i + 1) });
            }
            setPages(bindingPages);

        } else if (pagesCount >= 8) {
            bindingPages.push({ text: 1, active: true, number: 1 });
            bindingPages.push({ text: 2, active: false, number: 2 });
            bindingPages.push({ text: 3, active: false, number: 3 });
            bindingPages.push({ text: 4, active: false, number: 4 });
            bindingPages.push({ text: 5, active: false, number: 5 });
            bindingPages.push({ text: "...", active: false, number: -1 });
            bindingPages.push({ text: pagesCount, active: false, number: pagesCount });

            setPages(bindingPages);
        }
    }, [itemsCountState]);

    const handlePage_OnChange = (_page) => {
        if (_page.active === true) {
            return false;
        }

        if (_page.number === -1) {
            return false;
        }

        props.onPageChanged(_page.number);

        var pagesCount = Math.ceil(itemsCountState / itemPerPage);
        var bindingPages = [];
        var selectedNumber = _page.number;

        if (pagesCount <= 7) {
            for (var i = 1; i <= pagesCount; i++) {
                if (i === selectedNumber) {
                    bindingPages.push({ text: i, active: true, number: i });
                } else {
                    bindingPages.push({ text: i, active: false, number: i });
                }
            }

            setPages(bindingPages);
        } else if (_page.number < 5) {
            for (var j = 1; j < 6; j++) {
                if (j === selectedNumber) {
                    bindingPages.push({ text: j, active: true, number: j });
                } else {
                    bindingPages.push({ text: j, active: false, number: j });
                }
            }

            bindingPages.push({ text: "...", active: false, number: -1 });
            bindingPages.push({ text: pagesCount, active: false, number: pagesCount });

            setPages(bindingPages);
        } else if (_page.number > pagesCount - 4) {
            bindingPages.push({ text: 1, active: false, number: 1 });
            bindingPages.push({ text: "...", active: false, number: -1 });

            for (var k = pagesCount - 4; k < (pagesCount + 1); k++) {
                if (k === selectedNumber) {
                    bindingPages.push({ text: k, active: true, number: k });
                } else {
                    bindingPages.push({ text: k, active: false, number: k });
                }
            }

            setPages(bindingPages);
        } else {
            var center = _page.number;

            bindingPages.push({ text: 1, active: false, number: 1 });
            bindingPages.push({ text: "...", active: false, number: -1 });
            bindingPages.push({ text: center - 1, active: false, number: center - 1 });
            bindingPages.push({ text: center, active: true, number: center });
            bindingPages.push({ text: center + 1, active: false, number: center + 1 });
            bindingPages.push({ text: "...", active: false, number: -1 });
            bindingPages.push({ text: pagesCount, active: false, number: pagesCount });

            setPages(bindingPages);
        }
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end">
                {pages.map((page, key) => {
                     const classPageItem = classNames({
                        "page-item": true,
                        "active": page.active
                      });
                    return (
                        <li className={classPageItem} key={key}>
                            <a className="page-link" onClick={() => handlePage_OnChange(page)}>{page.text}</a>
                        </li>
                    );
                })}
            </ul>
        </nav>


        // <ul >
        //     <li className="page-item disabled">
        //         <a className="page-link" href="#" tabindex="-1">Previous</a>
        //     </li>
        //     <li className="page-item active"><a className="page-link" href="#">1</a></li>
        //     <li className="page-item"><a className="page-link" href="#">2</a></li>
        //     <li className="page-item"><a className="page-link" href="#">3</a></li>
        //     <li className="page-item">
        //         <a className="page-link" href="#">Next</a>
        //     </li>
        // </ul>
    );
}

Pagination.propTypes = {
    itemsCount: PropTypes.number
};
