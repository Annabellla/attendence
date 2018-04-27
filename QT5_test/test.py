#!/usr/bin/python3
# -*- coding: utf-8 -*-

"""
Py40 PyQt5 tutorial

In this example, we position two push
buttons in the bottom-right corner
of the window.

author: Jan Bodnar
website: py40.com
last edited: January 2015
"""

import sys
import cv2
import datetime
from PyQt5 import QtCore,QtGui,QtWidgets
from PyQt5.QtWidgets import (QWidget, QPushButton,QHBoxLayout, QVBoxLayout, QApplication)

class Example(QWidget):

    def __init__(self):
        super().__init__()
        self.set_ui()
        self.cap = cv2.VideoCapture()

    def set_ui(self):
        #定义按钮
        open_btn = QPushButton("打开摄像头")
        open_btn.clicked.connect(self.open_btn_click)

        capture_btn = QPushButton("拍照")
        capture_btn.clicked.connect(self.capture_btn_click)

        exit_btn = QPushButton("退出系统")
        exit_btn.clicked.connect(self.close)

        video = QtWidgets.QLabel("视频画面")
        image = QtWidgets.QLabel("照片")
        result = QtWidgets.QLabel("结果")

        #横向排列
        #第一排
        hbox1 = QHBoxLayout()
        hbox1.addStretch(1)
        hbox1.addWidget(video)
        hbox1.addWidget(image)
        hbox1.addWidget(result)
        # 第二排
        hbox = QHBoxLayout()
        hbox.addStretch(1)
        hbox.addWidget(open_btn)
        hbox.addWidget(capture_btn)
        hbox.addWidget(exit_btn)

        vbox = QVBoxLayout()
        vbox.addStretch(1)
        vbox.addLayout(hbox1)

        vbox.addStretch(1)
        vbox.addLayout(hbox)

        self.setLayout(vbox)
        self.setFixedSize(860, 520)
        self.setWindowTitle('调用摄像头拍照')
        self.show()

    #打开摄像头
    def open_btn_click(self):
        while (1):
            # get a frame
            ret, frame = self.cap.read()
            # show a frame
            self.video.setPixmap(frame)
            #cv2.imshow("capture", frame)
            cv2.waitKey(1)


    #拍照
    def capture_btn_click(self):
        print(2)

    #关闭窗口
    def closeEvent(self, event):
        ok = QPushButton("确认")
        cacel = QPushButton("取消")
        msg = QtWidgets.QMessageBox(QtWidgets.QMessageBox.Warning, u"关闭提示", u"是否关闭?")
        msg.addButton(ok,QtWidgets.QMessageBox.ActionRole)
        msg.addButton(cacel, QtWidgets.QMessageBox.RejectRole)
        if msg.exec_() == QtWidgets.QMessageBox.RejectRole:
            event.ignore()
        else:
            event.accept()


if __name__ == '__main__':
    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())